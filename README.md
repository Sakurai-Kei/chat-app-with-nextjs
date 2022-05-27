<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sakurai-kei/chat-app-with-nextjs">
    <img src="public/chat_alt.svg" alt="Readme Logo" width="80" height="80">
  </a>

<h3 align="center">Chat App with NextJs</h3>

  <p align="center">
    A full-stack NextJs chat app using SWR for real-time data fetching from MongoDB
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a> -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![The Home Page][product-screenshot]](https://github.com/Sakurai-Kei/chat-app-with-nextjs/blob/main/public/web-example.png)

A full-stack app made with NextJs. The app features group creation and private chat instances with other user. As this is a prototype app, the app does not check if
the provided email is legit. This app does hash user's password with bcryptjs to improve account security. Auth state across the app is possible using iron-session.

Currently, the app is at a very basic level. Features are extremely limited but basic functionality such as creating a group, inviting other people to a group, and
chatting with other users in a private chat instance is possible. Do note, however, content of a message is not encrypted and as such, anyone with access to the database
can view the content of a message.

Data fetching is made with SWR for efficient real-time data fetching.

More features to come!

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Mongoose](https://mongoosejs.com/)
- [SWR](https://swr.vercel.app/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [iron-session](https://github.com/vvo/iron-session)
- [date-fns](https://date-fns.org/)
- [emoji-picker-react](https://github.com/ealush/emoji-picker-react)
- [videojs](https://videojs.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you would like to try to run this app on your own, follow the instructions below

### Prerequisites

Things to have before cloning the repo

- Make sure to have at least Node v 16.14.2 or later
- Set up a MongoDb Cluster

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sakurai-kei/chat-app-with-nextjs.git
   ```
2. CD into local repo and install NPM packages
   ```sh
   npm install
   ```
3. Create a file named `.env.local`. In this file, copy and paste below with your own variable\
   `
  MONGODB_URI="YOUR_MONGODB_URI"
   `\
   `
  COOKIE_SECRET="SECRET_STRING_FOR_COOKIE_ENCRYPTION"
   `

4. Run the app in dev environment with
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [✔️] Deploy the app
- [✔️] Support for user profile(profile picture etc)
- [✔️] Chat Improvement
  - [✔️] Emoji Support
  - [✔️] Image Support
- [ ] Cleaner UI
- [ ] Cleaner Code

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

For now, the project is strictly for my educational purposes. However, if you want to fork the project and add your own features, feel free to do so.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPL License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Luqmanul Hakim - [@RaiserAshfell](https://twitter.com/RaiserAshfell) - luqmanulraiserhakim@gmail.com

Project Link: [https://github.com/sakurai-kei/chat-app-with-nextjs](https://github.com/sakurai-kei/chat-app-with-nextjs)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

This project is possible thanks to the good documentation provived by all the packages that I use. Without them, making this project would be a lot harder.\
Next, I would like to extend my gratitude to Meraki UI, tail-kit, and Lofi UI for their UI templates. It helped boost productivity by reducing the time I needed to design a component from scratch\
Finally, I extend my gratitude to Heroicons and coolicons. The svg icons available in this project are from this two sources

<!-- * []()
* []()
* []() -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: https://raw.githubusercontent.com/Sakurai-Kei/chat-app-with-nextjs/main/public/web-example.png
