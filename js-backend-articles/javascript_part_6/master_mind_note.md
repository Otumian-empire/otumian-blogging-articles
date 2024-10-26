## Introduction

We are going to implement some programs to put what we have learnt so far into use. The programs to write includes:

- [mastermind][wiki-play-mastermind]
- > We are going to implement the master mind board game in JavScript. You can reference similar implementation here, [Master mind in python](https://dev.to/otumianempire/mastermind-board-game-implementation-in-python-26le)

Let's code a [mastermind][wiki-play-mastermind]. This is a simple board game that uses colours but We'd use numbers instead.

**Summary**: Behind a bar are four colours put up by one player. The other player can not see the first player's colours. The first player's colours are called the code maker and the other player's colours are the code breaker. The code breaker has, inclusively, between 2 to 12 attempts at guessing the code makers'. The number of attempts must be even.

## Implementation

- Import the _random_ module

  ```py
  import random

  ```

- The number of times to play must be even between 2 to 12 rounds

  ```py
  while True:
      try:
          rounds = int(input("Enter number of rounds (Even): "))

          if rounds >= 2 and rounds <= 12 and rounds % 2 == 0:
              break

      except ValueError:
          print("Round must be an even number from 2 to 12 includes")

  ```

- settings: should there be duplicates and blanks? Let's allow the user to enter _1_ for _true_ and _0_ for _false_. I don't think we'd need a blank since we are using numbers for the (this) mastermind game. We will make it such that when the user enters a number that is not specified, we'd set the duplication to _0_.

  ```py
  try:
      duplicates_allowed = int(input("Duplicates allowed? (1/0) "))
  except ValueError:
      duplicates_allowed = 0

  ```

- The number of codes we will be dealing with will be four. So we will have four codes in the code breaker.

  ```py
  NUMBER_CODE = 4

  ```

- The code maker is that which the user has to guess, with the code breaker. We will create the code maker taking into account the option, _duplicates_allowed_.

  ```py
  code_maker = []
  counter = 0

  while counter < NUMBER_CODE:
      code = random.randint(0, 9)

      if duplicates_allowed:
          code_maker.append(code)
          counter += 1

      else:
          if not code in code_maker:
              code_maker.append(code)
              counter += 1
  ```

- Since this is a game, it must prove challenging but not too challenging as such we have to provide the user with some hints. we will hint the user if they are close to the code. Let `[0, 0, 0, 0]` represents each code and if the code breaker is greater than the code maker, hint _1_, hint _0_ when equal else _-1_. It would be okay had we used numbers other than _-1_, _0_ or _1_ as hints. (Python would let me get away with using string for the `hints` list.

  ```py
  hints = ['h', 'i', 'n', 't']

  ```

- Now we can take in the user's guess, which is the code breaker. The user will be playing our mastermind, where the user guesses the code maker. The game terminates when the number of rounds is exhausted or the code breaker matches the code maker, in this case, all the hints will `[0, 0, 0, 0]`.

  ```py
  # code breaker guesses the code by the code maker
  while rounds > 0:

      # enter guess with spaces
      code_breaker = list(map(int, input("Enter codes space separated: ").split()))

      # compare the code_breaker to the code maker
      for i in range(NUMBER_CODE):
          if code_breaker[i] > code_maker[i]:
              hints[i] = 1
          elif code_breaker[i] == code_maker[i]:
              hints[i] = 0
          else:
              hints[i] = -1

      # because of the values that we used to hint the user
      # we have to find some dicey way to break the program
      # when the user guesses the code (all hints go to 0)
      if hints.count(0) == 4:
          break

      print(hints)

      rounds -= 1
  ```

- we now decide who won the game base on the number of rounds

  ```py
  if rounds > 0:
      print("You won the rounds")
  else:
      print("You lost bitterly to a computer")

  print(code_maker)
  ```

### Final snippet

```py
# app.py

# Import the _random_ module
import random

# The number of times to play must be even between 2 to 12 rounds
while True:
    try:
        rounds = int(input("Enter number of rounds (Even in [2, 12]): "))

        if rounds >= 2 and rounds <= 12 and rounds % 2 == 0:
            break

    except ValueError:
        print("Round must be an even number from 2 to 12 includes")


# should there be duplicates
try:
    duplicates_allowed = int(input("Duplicates allowed? (1/0) "))
except ValueError:
    duplicates_allowed = 0


# The number of codes we will be dealing with will four
NUMBER_CODE = 4


# The code maker
code_maker = []
counter = 0

while counter < NUMBER_CODE:
    code = random.randint(0, 9)

    if duplicates_allowed:
        code_maker.append(code)
        counter += 1

    else:
        if not code in code_maker:
            code_maker.append(code)
            counter += 1


# hint
hints = ['h', 'i', 'n', 't']


# code breaker guesses the code by the code maker
while rounds > 0:

    # enter guess with spaces
    code_breaker = list(map(int, input("Enter codes space separated: ").split()))

    # compare the code_breaker to the code maker
    for i in range(NUMBER_CODE):
        if code_breaker[i] > code_maker[i]:
            hints[i] = 1
        elif code_breaker[i] == code_maker[i]:
            hints[i] = 0
        else:
            hints[i] = -1

    # because of the values that we used to hint the user
    # we have to find some dicey way to break the program
    # when the user guesses the code (all hints go to 0)
    if hints.count(0) == 4:
        break

    print(hints)

    rounds -= 1


# declaring the result of the game
if rounds > 0:
    print("You won the rounds")
else:
    print("You lost bitterly to a computer")

print(code_maker)


```

## Let's show off a little

We will create functions and constants where possible. I remember doing something like this once and I later went back to the old code because I could find where I was - I was lost in my code. It happens. Sometimes it is not the best and sometimes it is. I am interested in showing you another possibility.

```py
# app2.py

# Import the _random_ module
import random
import os
from time import sleep


# string constants
ROUNDS_PROMPT = "Enter number of rounds (Even in [2, 12]) 🤗️: "
INVALID_ROUNDS_PROMPT = "Round must be an even number from 2 to 12 includes 😩️"
DUPLICATE_PROMPT = "Duplicates allowed? (1/0) 🤤️: "
CODE_BREAKER_PROMPT = "Enter codes separated by space: "
WIN_PROMPT = "You won the rounds 👏️"
LOSS_PROMPT = "You lost bitterly to a computer 😏️"

# int constants
ZERO, ONE = 0, 1
NUMBER_CODE = 4
TERMINATING_VALUE = 0
MORE, EQUAL, LESS = 1, 0, -1
MIN_ROUNDS, MAX_ROUNDS = 2, 12
RAND_INT_MIN, RAND_INT_MAX = 0, 9
WAITING_TIME = 3

# The code maker
code_maker = []

# hint
hints = ['h', 'i', 'n', 't']

def clear_screen() :
    os.system('cls' if os.name == 'nt' else 'clear')

# validates the round input
def isvalid_round(rounds):
    return MIN_ROUNDS <= rounds <= MAX_ROUNDS and rounds % 2 == ZERO


# declaring the result of the game
def declare_result(rounds):
    if rounds > TERMINATING_VALUE:
        print(WIN_PROMPT)
    else:
        print(LOSS_PROMPT)


# generate code maker
def generate_code_maker(duplicates_allowed):
    counter = 0

    while counter < NUMBER_CODE:
        code = random.randint(RAND_INT_MIN, RAND_INT_MAX)

        if duplicates_allowed:
            code_maker.append(code)
            counter += ONE

        else:
            if not code in code_maker:
                code_maker.append(code)
                counter += ONE


# compare the code_breaker to the code maker
def compare_code():
    # enter guess with spaces
    code_breaker = list(map(int, input(CODE_BREAKER_PROMPT).split()))

    for pos in range(NUMBER_CODE):
        if code_breaker[pos] > code_maker[pos]:
            hints[pos] = MORE
        elif code_breaker[pos] == code_maker[pos]:
            hints[pos] = EQUAL
        else:
            hints[pos] = LESS


# entry point
def App():
    # The number of times to play must be even between 2 to 12 rounds
    while True:
        try:
            rounds = int(input(ROUNDS_PROMPT))

            if isvalid_round(rounds):
                break

        except ValueError:
            print(INVALID_ROUNDS_PROMPT)


    # should there be duplicates
    try:
        duplicates_allowed = int(input(DUPLICATE_PROMPT))
    except ValueError:
        duplicates_allowed = ZERO



    generate_code_maker(duplicates_allowed)


    # code breaker guesses the code by the code maker
    while rounds > TERMINATING_VALUE:
        compare_code()

        # because of the values that we used to hint the user
        # we have to find some dicey way to break the program
        # when the user guesses the code (all hints go to 0)
        if hints.count(EQUAL) == NUMBER_CODE:
            break

        print(hints)

        rounds -= ONE


    declare_result(rounds)

    print(code_maker)


# infinitely keep playing
while True:
    App()

    sleep(WAITING_TIME)
    clear_screen()

    # reset the game for replay
    code_maker = []
    hints = ['h', 'i', 'n', 't']

```

## Is there room for improvement?

Even though, this is a simple console/terminal/text based app, there is more we can do to it.

- We can put all the constants in its own file, `constants.py`.
- Put all functions that can standalone into their own file, `functions.py`. We can then refactor standalone functions that depends on a global variable then pass that data as an argument to the function using a parameter.
- We can even have a separate file for

```py

# infinitely keep playing
while True:
    App()

    sleep(WAITING_TIME)
    clear_screen()

    # reset the game for replay
    code_maker = []
    hints = ['h', 'i', 'n', 't']
```

and then add, `if __name__ == "__main__":...`

## Sources

- [wiki-play-mastermind][wiki-play-mastermind]
- [wikipedia-mastermind][wikipedia-mastermind]

#

[wiki-play-mastermind]: https://www.wikihow.com/Play-Mastermind
[wikipedia-mastermind]: https://en.wikipedia.org/wiki/Mastermind_(board_game)
