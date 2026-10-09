# Felix | ICT251 Activity 3 Interactive Personal Website

A responsive student portfolio built with plain HTML5, CSS and JavaScript for ICT251 Web Technologies at Mulungushi University. It has no frameworks and no build step.

*Live site:* https://felixnkaka-portfolio.onrender.com/

## Sections
About Me, My Hobbies, My Learning Plan, Projects and Skills, My Photos, My Media, Contact.

## The four JavaScript features (js/script.js)

| # | Feature | How to test |
|---|---------|-------------|
| 1 | Contact form validation and preview (compulsory) | Submit empty, with spaces only, and with abc@ as the email. Each is rejected with a message. Then enter valid details and a preview appears. No message is sent. |
| 2 | Gallery viewer | In My Photos, press Next and Previous. Previous is disabled on photo 1 and Next on photo 3. The caption and counter update. |
| 3 | Theme switch | Press Dark mode and Light mode in the header. Text stays readable in both. The choice is saved in the browser. |
| 4 | Mobile navigation | Make the window narrower than 768 px, then press Menu to open and Close to close it. Escape also closes it. |

## Folder structure

index.html
README.md
CSS/style.css
js/script.js
images/   (photo1.jpeg, photo2.jpeg, photo3.jpeg)
videos/   (intro.mp4, audio.mp3)

## Sources
All text, photos, video and audio are my own work. Fonts are system fonts, so no external libraries are used.

## Deployment
Hosted as a Render Static Site from this repository. Build command echo "No build required", publish directory ..