import os
import random

mint_amount = 2

images = os.listdir('./../build/images/')

for i in range(mint_amount):
    mint = random.choice(images)
    os.system(f'start ./../build/images/{mint}')