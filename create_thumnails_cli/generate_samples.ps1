# first we have to get the arg from the commandline which will be the number of images to generate

$num_images = $args[0]
if ($null -eq $num_images) {
    $num_images = "5"
}
# cast the arg to an int
$num_images = [int]$num_images

$image_size = $args[1]
if ($null -eq $image_size) {
    $image_size = "2000"
}

# cast the arg to an int
$image_size = [int]$image_size

# create folder to store the images in
$testPath = Test-Path "sample_images"
if ($testPath -eq $false) {
    New-Item -ItemType Directory -Path "sample_images"
}
else {
    Remove-Item -Path "sample_images" -Recurse -Force
    New-Item -ItemType Directory -Path "sample_images"
}

# now all we need to do is call to the lorem picsum api and save the images to the folder
for ($i = 0; $i -lt $num_images; $i++) {
    $url = "https://picsum.photos/$image_size"
    $output = "sample_images/$i.jpg"
    Invoke-WebRequest -Uri $url -OutFile $output
}

write-host "Done generating images"

