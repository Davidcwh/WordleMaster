import heapq
import math
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json

def load_json_object(filename):
    with open(filename, 'r') as fp:
        return json.load(fp)

def init_word_list():
    with open('data/wordle-answers-alphabetical.txt', 'r') as f:
        lines = f.readlines()
        for i in range(len(lines)):
            lines[i] = lines[i].rstrip("\n")
        return lines

all_possible_results = load_json_object('data/all_possible_results.json')
guess_to_answer_results = load_json_object('data/guess_to_answer_results.json')
init_words = init_word_list()
init_words_set = set(init_words)

def generate_result(guess, answer):
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

    for i in range(len(guess)):
        if guess[i] != '#' and guess[i] != '@' and guess[i] not in answer:
            result = result[:i] + 'b' + result[i + 1:]

    return result

def is_word_eliminated(guess, word, result):
    actual_result = None

    if guess not in init_words_set:
        actual_result = generate_result(guess, word)
    else:
        actual_result = guess_to_answer_results[guess][word]

    return  actual_result != result


def get_remaining_words(words, guess, result):
    remaining_words = []
    for word in words:
        if not is_word_eliminated(guess, word, result):
            remaining_words.append(word)
    return remaining_words

def calculate_word_expected_info(words, word):
    expected_information = 0
    for result in all_possible_results:
        remaining_words = get_remaining_words(words, word, result)
        probability = float(len(remaining_words)) / float(len(words))
        if probability == 0:
            info_bits = 0
        else: 
            info_bits = math.log((1.0 / probability), 2)
        expected_information += (probability * info_bits)

    return expected_information

def get_expected_info_heap(words):
    heap = []
    for word in words:
        expected_info = calculate_word_expected_info(words, word)
        heapq.heappush(heap, (expected_info, word))
    return heap

def get_best_n_guesses(words, n):
    best_guesses = heapq.nlargest(n, get_expected_info_heap(words))
    result = map(lambda item: {"word": item[1], "expectedInfo": item[0]}, best_guesses)
    return list(result)


app = Flask(__name__)
CORS(app)

@app.route('/api/best-guesses', methods=["POST"])
@cross_origin()
def post_best_guesses():
    data = request.json
    words = data["words"]
    guess = data["guess"]
    result = data["result"]
    remaining_words = get_remaining_words(words, guess, result)
    best_guesses = get_best_n_guesses(remaining_words, 10)
    body = dict()
    body["remainingWords"] = remaining_words
    body["bestGuesses"] = best_guesses
    response = jsonify(body)
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)