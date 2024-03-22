# Catrancher
Here at Quantcast, we like our cats. We've got so many cats, that we had to hire a cat rancher to take
care of all of them. One of the rancher's main jobs is to separate the cats into groups of 3 cats (a clowder)
that get along. In order to avoid cat fights in the clowder, each cat in the group must either be the same or
different from every cat in the group for each attribute. We need your help making a frontend page for
this. Can you implement this design?
### Cats
Each cat will have 4 attributes (cattributes if you will) that make it unique. The cattributes and their
possible values are:
1. Stripes: 1, 2, 3
2. Color: black (b), white (w), grey (t)
3. Shape: tall (t), short (s), round (r)
4. Eyes: green (g), blue (b), red (r)
Three tall cats will get along; a tall, a short, and a round cat will get along; but if you put two tall cats and
one short cat in clowder, there will be cat fights.
This rule applies for each cattribute individually.
Valid clowders: 1ttg 2wsb 3brr, 2tsg 2wsb 2bsr, 3ttg 2wsb 1brr
Invalid clowders: 1ttg 1wsb 3brr, 1tsg 1wsb 2bsr, 1tsg 1wsb 1bsg
The cats in the clowder must get along.

## Getting Started

Now, if you open the index.html file in any browser using the file protocol, you'll see that the application is up and running.









