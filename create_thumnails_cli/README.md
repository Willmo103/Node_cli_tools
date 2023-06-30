# *Project: Image Thumbnail Generator

## Description

Create a command-line application that generates thumbnail images for a given directory of images.
The application will read images from the source directory, resize them to a specified thumbnail
size, and save the thumbnail images in a separate destination directory. This can be useful for
generating smaller versions of images for web applications or galleries.

## Features

1) Scan a source directory and identify image files.
2) Resize images to a specified thumbnail size while maintaining the aspect ratio.
3) Save the resized thumbnail images to a destination directory.
4) Support customization of thumbnail size through command-line arguments or configuration files.
5) Provide progress updates and error handling during the thumbnail generation process.
6) Handle different image file formats (e.g., JPEG, PNG) using appropriate libraries or modules.

## Technologies

- Node.js
- File System (fs module)
- Image Processing Libraries (such as sharp, gm, or jimp)
- Asynchronous programming (Promises, async/await)

Here are some suggested tasks to get started:

1) Set up the project structure, including directories for source images and destination thumbnails.
2) Implement a function to scan the source directory and identify image files.
3) Choose an image processing library and install it as a dependency.
4) Write a function to resize images to the specified thumbnail size using the chosen library.
5) Create destination directories for the thumbnails.
6) Implement a function to generate thumbnail images from the source images and save them in the destination directories.
7) Add support for customizing the thumbnail size through command-line arguments or configuration files.
