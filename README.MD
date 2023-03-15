# 💡 What is Enigma?

Enigma is a Node.js program that can convert files into videos, which can later be uploaded to video hosting or sharing platforms such as YouTube. Enigma can also be used to convert those videos back into files, allowing users to upload files to YouTube or any other video sharing platform that only accepts video files.

> **_NOTE:_** This repository is under development and can corrupt your data.

# 💻 How to use ?

clone the repository and run `index.js` file with node.

```bash
$ git clone https://github.com/Ashwin-Codes/enigma.git
$ cd enigma
$ node index
```

Enigma will give you three options :<br>

1.  Encode : This will allow you to encode files to videos.<br>
2.  Decode : This can be used to decode the videos back to file.<br>
3.  Download : (Not Coded yet) This will allow users to download videos from video hosting providers.

Please use .zip files to encode and decode.

## 🤓 Issues to fix

1. Enigma uses the Canvas package to create frames, but with the current implementation, it is too slow for this kind of job. Need to find a way to make it faster or use a different method altogether.

2. The last frame, when not completely filled, carries filler bits that can result in exceeding the original file size or file corruption. I know how to fix this.

3. Youtube compresses the video which can sometime result in data loss. Need to find a way to fix this too.

## 🤓 Features to add

1. Add the repository to npmjs.com, and make npx commands to use encoding and decoding.

2. Add download option as well as option to give a url as an argument to 'decode' option.

# 💡 Developer's Note

I wanted to make Enigma public when completed, but I am currently under a tight time crunch. So, have fun with it and try to break it as much as possible, so that I can identify what else needs to be added and fixed.
