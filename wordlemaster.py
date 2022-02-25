import heapq
import sys
from solver import Solver
import threading

# reads list of words from text file and returns a list of the input words
def init_word_list():
    #with open('input.txt', 'r') as f:
    words = []
    # with open('input/wordle-all-words.txt', 'r') as f:
    with open('input/wordle-answers-alphabetical.txt', 'r') as f:
        lines = f.readlines()
        for i in range(len(lines)):
            lines[i] = lines[i].rstrip("\n")
        return lines
    
def get_average_num_guesses(words):
    total_num_guesses = 0
    total_num_words = len(words)
    solver = Solver(words)
    for answer in words:
        print("================== current answer: " + answer)
        num_guesses = 0
        first_guess = True
        while True:
            current_guess = 'slate' # save time, skip initial guess
            if not first_guess:
                # print(solver.get_best_n_guesses(10))
                current_guess = solver.get_best_n_guesses(10)[0][1]
            else:
                first_guess = False

            num_guesses+=1
            result = solver.guess_to_answer_results[current_guess][answer]
            print("current guess: [" + current_guess + "] for [" + answer + "] gives result: [" + str(result) + "]")
            
            if current_guess == answer:
                break

            solver.record_result(current_guess, result)
        solver.reset()
        print("================== [" + answer + "] " + "took " + str(num_guesses) + " guesses")

        total_num_guesses += num_guesses
    
    average_num_guesses = float(total_num_guesses) / float(total_num_words)

    print("For total number of " + str(total_num_words) + " words, the average number of guesses is " + str(average_num_guesses))

def print_all_words_expected_info(solver):
    expected_info_list = solver.get_best_n_guesses(2315) # 12972
    for expect_info_word in expected_info_list:
        print(expect_info_word[1] + " " + str(expect_info_word[0]))

def parse_input():
    data = dict()
    with open('input/input.in', 'r') as f:
        lines = f.readlines()
        for i in range(len(lines)):
            line = lines[i].split()
            word = line[3][1:6]
            result = line[6][1:6]
            info = float(line[12].rstrip("\n"))

            if word not in data.keys():
                data[word] = dict()
            
            data[word][result] = info
    return data

if __name__ == "__main__":
    words = init_word_list()
    # get_average_num_guesses(words)
    solver = Solver(words)
    # print_all_words_expected_info(solver)
    solver.start()
    # solver.save_json_files()

    