import math
import heapq
from queue import Queue
import json

class Solver:
    def __init__(self, words):
        self.init_words = words
        self.words = list(words)
        self.all_possible_results = self.load_json_object('input/all_possible_results.json')
        self.guess_to_answer_results = self.load_json_object('input/guess_to_answer_results.json')

    def reset(self):
        self.words = list(self.init_words)

    def load_json_object(self, filename):
        with open(filename, 'r') as fp:
            return json.load(fp)

    def save_json_files(self):
        with open('input/all_possible_results.json', 'w') as fp:
            json.dump(self.all_possible_results, fp)

        with open('input/guess_to_answer_results.json', 'w') as fp:
            json.dump(self.guess_to_answer_results, fp)
        
    # not used as it takes too long (1min~)
    def __read_guess_results(self):
        guess_to_answer_results = dict()
        with open('input/guess_to_answer_results.txt', 'r') as f:
            lines = f.readlines()
            for line in lines:
                line = line.split()
                guess = line[0]
                answer = line[1]
                result = line[2].rstrip("\n")

                if guess not in guess_to_answer_results.keys():
                    guess_to_answer_results[guess] = dict()

                guess_to_answer_results[guess][answer] = result

        return guess_to_answer_results

    # prefered over the read method above as generating programatically is relatively faster (11sec~)
    def __generate_guess_answer_results(self, guess_words, answer_words):
        guess_to_answer_result = dict()
        for guess in guess_words:
            guess_to_answer_result[guess] = dict()
            for answer in answer_words:
                guess_to_answer_result[guess][answer] = dict()

                result = 'ggggg' # when guess is same as answer
                if guess != answer:
                    result = self.generate_result(guess, answer)
                guess_to_answer_result[guess][answer] = result
        return guess_to_answer_result

    # returns true if a word is eliminated as the solution based on the given guess word and result of the guess
    def __is_word_eliminated(self, guess, word, result):
        # print(guess + ", " + word + ", " + result)
        if guess not in self.guess_to_answer_results.keys():
            word_result = self.__generate_guess_answer_results([guess], self.words)
            self.guess_to_answer_results[guess] = word_result[guess]
            # actual_result = self.generate_result(guess, word) # when guess is not in word list
        
        actual_result = self.guess_to_answer_results[guess][word]

        return  actual_result != result

    def __get_remaining_words(self, guess, result):
        remaining_words = []
        for word in self.words:
            if not self.__is_word_eliminated(guess, word, result):
                remaining_words.append(word)
        return remaining_words  

    def generate_all_results(self): 
        results = []
        queue = Queue()
        queue.put('')

        while queue.qsize() > 0:
            current = queue.get(0)
            if len(current) < 5:
                queue.put('b' + current)
                queue.put('y' + current)
                queue.put('g' + current)
            else:
                results.append(current)
        return results
            
    # The expected information of a word: sum of probability of each result * info bits of each result for the given word
    def __calculate_word_expected_info(self, word):
        expected_information = 0
        for result in self.all_possible_results:
            remaining_words = self.__get_remaining_words(word, result)
            probability = float(len(remaining_words)) / float(len(self.words))
            if probability == 0:
                info_bits = 0
            else: 
                info_bits = math.log((1.0 / probability), 2)
            expected_information += (probability * info_bits)

            # Additional heuristic: second step
            # max_result = self.get_second_step_result(remaining_words)
            # if max_result != None :
            #     # print('Best guess after [' + word + '] with result [' + result + '] is: ' + max_result[1] + ', with expected info: ' + str(max_result[0]))
            #     expected_information += (probability * max_result[0])
                
        return expected_information

    def __get_expected_info_heap(self):
        heap = []
        for word in self.words:
            expected_info = self.__calculate_word_expected_info(word)
            # print("====== [" + word + "] " + "E[I] = " + str(expected_info))
            heapq.heappush(heap, (expected_info, word))
        return heap

    def get_best_n_guesses(self, n):
        return heapq.nlargest(n, self.__get_expected_info_heap())

    def record_result(self, word, result):
        remaining_words = self.__get_remaining_words(word, result)
        self.words = remaining_words
        
    def generate_result(self, guess, answer):
        result = 'xxxxx'
        for i in range(len(guess)):
            if guess[i] == answer[i]:
                result = result[:i] + 'g' + result[i + 1:]
                answer = answer[:i] + '_' + answer[i + 1:]
                guess = guess[:i] + '#' + guess[i + 1:]

        for i in range(len(guess)):
            if guess[i] in answer:
                result = result[:i] + 'y' + result[i + 1:]
                answer = answer.replace(guess[i], '_', 1) # replace first occurence
                guess = guess[:i] + '@' + guess[i + 1:]

        # print(guess)
        # print(answer)
        for i in range(len(guess)):
            if guess[i] != '#' and guess[i] != '@' and guess[i] not in answer:
                result = result[:i] + 'b' + result[i + 1:]

        return result
    
    def start(self):
        print("Hello! Lets play some Wordle! :)")
        is_first_guess = True
        while True:
            print("Getting next best guess...\n")
            guesses = [(9.73303625692, 'slate'), (9.72313228696, 'least'), (9.70347260351, 'crate'), (9.69975777415, 'trail'), (9.69912049258, 'trace'), (9.69551156031, 'leant'), (9.69509413108, 'train'), (9.68085216726, 'stale'), (9.67042004581, 'irate'), (9.6647170667, 'crane')]
            if not is_first_guess:
                guesses = self.get_best_n_guesses(10)
            else:
                is_first_guess = False

            print('Next Top ' + str(len(guesses)) + ' guesses:')
            print('______________________________')
            print('##    [WORD]   [EXPECTED INFO]')

            for i in range(len(guesses)):
                word = guesses[i]
                index = str(i + 1)
                if i + 1 < 10:
                    index = '0' + index
                print(index + '    ' + word[1] + '    ' + str(word[0]))
            print('______________________________')

            if len(guesses) == 1:
                print('Only possible word left is: ' + guesses[0][1])
                break
            elif len(guesses) == 0:
                print('Oh no, there are no more possible words left. Something went wrong :(')
                break
            else:
                guess = raw_input("Enter your next guess: ")
                result = raw_input("Enter the result of the guess: ")
                self.record_result(guess, result)
                print("Result recorded!")
        print("Goodbye! Don't forget to continue your streak tmr :)")

    # second step functions ================================================
    def get_second_step_result(self, second_step_words):
        max_result = None # tuple (expected info, word)
        for word in second_step_words:
            expected_info = self.second_step_calculate_word_expected_info(word, second_step_words)
            if max_result is None or max_result[0] < expected_info:
                max_result = (expected_info, word)
        return max_result
            

    def second_step_calculate_word_expected_info(self, word, words):
        expected_information = 0
        for result in self.all_possible_results:
            remaining_words = self.second_step_get_remaining_words(word, result, words)
            probability = float(len(remaining_words)) / float(len(words))
            if probability == 0:
                info_bits = 0
            else: 
                info_bits = math.log((1.0 / probability), 2)
            expected_information += (probability * info_bits)
        return expected_information

    def second_step_get_remaining_words(self, guess, result, words):
        remaining_words = []
        for word in words:
            if not self.__is_word_eliminated(guess, word, result):
                remaining_words.append(word)
        return remaining_words

