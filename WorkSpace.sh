
if [ -z "$1" ]; then
    gedit style.css index.html cover.html work.html projects.html canvas.js script.js &
else
    gedit $@ & #script.js style.css index.html $@ &
fi

mySite="file:///home/pi/Udemy_WebDev/cv/index.html"
myProj="file:///home/pi/Udemy_WebDev/cv/projects.html"
duckgo="https://duckduckgo.com/"
course="https://www.udemy.com/home/my-courses/learning/"
links="https://www.appbrewery.co/p/web-development-course-resources/"
stack="https://stackoverflow.com/"

chromium-browser $myProj & # $course &
