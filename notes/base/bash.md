# BaSH Notes

## Main Commands

|   Command | Description                                  | Example                                            |
| --------: | -------------------------------------------- | -------------------------------------------------- |
|   `clear` | Clear terminal                               | `clear`                                            |
| `history` | Show history                                 | `history`                                          |
|     `pwd` | Show working directory                       | `pwd`                                              |
|      `cd` | Change directory                             | `cd <directory>`                                   |
|      `cd` | Change directory to a multilevel path        | `cd <directory>/<sub_directory>`                   |
|      `cd` | Change directory to your home directory      | `cd ~`                                             |
|      `cd` | Change directory to the parent directory     | `cd ..`                                            |
|      `ls` | List directories and files                   | `ls <directory>`                                   |
|      `ls` | List all directories and files (even hidden) | `ls -a`                                            |
|      `ls` | List directories and files recursively       | `ls -R`                                            |
|      `ls` | Show more information for `ls`               | `ls -lt`                                           |
|   `mkdir` | Create directory                             | `mkdir <directory>`                                |
|   `touch` | Create file                                  | `touch <file>`                                     |
|    `echo` | Write in file (overwrite)                    | `echo "<text>" > <file>`                           |
|    `echo` | Write in file (append)                       | `echo "<text>" >> <file>`                          |
|     `cat` | Show content of a file                       | `cat <file>`                                       |
|     `cat` | Show content of multiple files               | `cat <file1> <file2>`                              |
|    `head` | Show the first 10 lines                      | `head <file>`                                      |
|    `tail` | Show the last 10 lines                       | `tail <file>`                                      |
|      `cp` | Copy file                                    | `cp <file_source> <file_destination>`              |
|      `cp` | Copy directory                               | `cp -R <directory_source> <directory_destination>` |
|      `mv` | Move file                                    | `mv <file_source> <file_destination>`              |
|      `rm` | Remove file                                  | `rm <file>`                                        |
|      `rm` | Remove multiple files                        | `rm <file1> <file2>`                               |
|      `rm` | Remove directory and its content             | `rm -R <directory>`                                |
|   `rmdir` | Remove empty di# rectory                     | `rmdir <directory>`                                |
|    `code` | Open file in VSCode                          | `code <file>`                                      |
|    `code` | Open current directory in VSCode                     | `code .`                                 |

## Help

Use `--help` to see more information.

```bash
<command> --help
```

> `<command>` is the name of the command you want to see more information about.

> [!note]
> Using Linux or MacOS? You can also use `man <command>` to see the manual page of this command.

## Navigating

### Change directory

Use `cd` to move to the named directory.

```bash
cd <directory>
```

> `<directory>` is the name of the directory you want to move to.

#### Change directory to your home directory

```bash
cd ~
```

#### Change directory to the parent directory

```bash
cd ..
```

<!-- cd <directory>/<directory> -->

#### Change directory to a multilevel directory

```bash
cd <directory>/<sub_directory>
```

> `<directory>/<sub_directory>` is the path of the sub directory you want to move to.

---

### List directories and files

Use `ls` to list directories and files in the current directory.

```bash
ls <options> <directory>
```

> `<options>` and `<directory>` are optional.

#### List all directories and files in the current directory

```bash
ls -a
```

#### List directories and files recursively

Use `ls -R` to list directories and files in the current directory and its subdirectories.

```bash
ls -R
```

#### Show more information for `ls`

```bash
ls -lt
```

---

### Show working directory

Use `pwd` to show the current working directory.

```bash
pwd
```

---

### Go to another directory but keep the current working directory in cache

Use `pushd` to go to an other directory but keep the current working directory in cache.
Use `popd` to return to the current working directory.

```bash
pushd <directory>
```

> `<directory>` is the name of the directory you want to go to.

```bash
popd
```

## Directory operations

### Create directory

Use `mkdir` to create a new directory.

> [!tip]
> `mkdir -v` will print the name of each created directory.

```bash
mkdir <directory>
```

> `<directory>` is the name of the directory you want to create.

#### Create a multilevel directory

```bash
mkdir <directory1>/<directory2>
```

> `<directory1>/<directory2>` is the path of the sub directory you want to create.

#### Create a multiple directory

```bash
mkdir <directory1> <directory2> ...
```

> `<directory1> <directory2> ...` are the names of the directories you want to create.

---

### Copy directory

Use `cp -R` to copy a directory.

`cp` acts like a copy/paste.

> [!tip]
> `cp -R -v` will print the name of each copied directory.

```bash
cp -R <directory_source> <directory_destination>
```

> `<directory_source>` is the name of the directory you want to copy.
> `<directory_destination>` is the name of the directory you want to copy to.
> `-R` is used to copy a directory recursively.

---

### Move directory

Use `mv` to move a directory.

`mv` acts like a cut/paste.

> [!tip]
> `mv -v` will print the name of each moved directory.

```bash
mv <directory_source> <directory_destination>
```

> `<directory_source>` is the name of the directory you want to move.
> `<directory_destination>` is the name of the directory you want to move to.

#### Rename directory

Use `mv` to rename a directory.

> [!tip]
> `mv -v` will print the name of each renamed directory.

```bash
mv <directory_name> <directory_new_name>
```

> `<directory_name>` is the name of the directory you want to rename.
> `<directory_new_name>` is the new name of the directory.

---

### Delete directory

Use `rm` to delete a directory.

> [!tip]
> `rm -v` will print the name of each deleted directory.

#### Delete an empty directory

Use `rmdir` to delete an empty directory.

```bash
rmdir <directory>
```

> `<directory>` is the name of the directory you want to delete.

#### Delete a directory recursively
>
> [!warning]
> Pay attention that `rm -R` will delete all the files and subdirectories in the directory.

```bash
rm -R <directory>
```

> `<directory>` is the name of the directory you want to delete.

## File operations

### Create file

Use `touch` to create a new file.

```bash
touch <file>
```

> `<file>` is the name of the file you want to create.

#### Create multiple files

If you want to create multiple files, use `touch <file1> <file2> ...`

```bash
touch <file1> <file2> ...
```

> `<file1> <file2> ...` are the names of the files you want to create.

---

### Write in a file

Use `echo` to write in a file.

```bash
echo "<text>" > <file>
```

> `<text>` is the text you want to write in the file.
> `<file>` is the name of the file you want to write in.

> [!warning]
> `>` will overwrite the content of the file.

#### Write multiple lines in a file

```bash
echo "<text1>\n<text2>" > <file>
```

> `<text1>` and `<text2>` are the text you want to write in the file.
> `\n` is used to add a new line.
> `<file>` is the name of the file you want to write in.

#### Write without overwriting the content of the file

```bash
echo "<text>" >> <file>
```

> `<text>` is the text you want to write in the file.
> `<file>` is the name of the file you want to write in.

---

### Show file content

Use `cat` to show the content of a file.

```bash
cat <file>
```

> `<file>` is the name of the file you want to show.

#### Show only the 10 first lines of a file

```bash
head <file>
```

> `<file>` is the name of the file you want to show.

#### Show only the 10 last lines of a file

```bash
tail <file>
```

> `<file>` is the name of the file you want to show.

---

### Copy file

Use `cp` to copy a file.

> [!tip]
> `cp -v` will print the name of each copied file.

```bash
cp <file_source> <file_destination>
```

> `<file_source>` is the name of the file you want to copy.
> `<file_destination>` is the name of the file you want to copy to.

---

### Move file

Use `mv` to move a file.

> [!tip]
> `mv -v` will print the name of each moved file.

```bash
mv <file_source> <file_destination>
```

> `<file_source>` is the name of the file you want to move.
> `<file_destination>` is the name of the file you want to move to.

#### Move all the files with the same extension

```bash
mv *.<file_extension>
```

> `<file_extension>` is the extension of the files you want to move.

#### Rename file

Use `mv` to rename a file.

> [!tip]
> `mv -v` will print the name of each renamed file.

```bash
mv <file_name> <file_new_name>
```

> `<file_name>` is the name of the file you want to rename.
> `<file_new_name>` is the new name of the file.

---

### Delete file

Use `rm` to delete a file.

> [!tip]
> `rm -v` will print the name of each deleted file.

```bash
rm <file>
```

> `<file>` is the name of the file you want to delete.

#### Delete multiple files

```bash
rm <file1> <file2> ...
```

> `<file1> <file2> ...` are the names of the files you want to delete.
