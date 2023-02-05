read_file = open("modifier.txt", "r", encoding='utf-8');
write_file = open("modifierArray.txt", "w", encoding='utf-8');

for line in read_file:
    write_file.write(", '{}'".format(line.rstrip()))