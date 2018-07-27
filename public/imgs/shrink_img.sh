#!/bin/bash

echo $0

#example:
# sh source/images/shrink_img.sh ~/Documents/project/images/img-folder

echo ""
echo "Checking for Images to shrink..."
echo ""

find $1 -type f -exec sh -c '
	filename=$(basename "$0")
	extension="${filename##*.}"
	filename="${filename%.*}"

	#size=$(wc -c <"$0")
	#file_is_big=$(($size > 1000000))

	width=$(identify -format "%w" "$0")> /dev/null
	height=$(identify -format "%h" "$0")> /dev/null

	dir=$(dirname "$0")

	echo "Shrinking...$0 to $filename.jpg"

	convert "$0" -resize 300x300\> -quality  70% "$dir/$filename.jpg" #ACTUALLY SHRINK AND CONVERT

	if [ "$extension" != "jpg" ] #DELETE THE OLD PHOTO
	then
		echo "DELETING...$0"
		rm "$0"
	fi
' {} ';'
