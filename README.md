# Portfolio Builder Project (Work in Progress)

## Introduction
Craft your professional portfolio website without any coding required! Portfolio Builder offers an easy-to-use interface, theme customization, and seamless deployment on GitHub Pages.
## Demo
Check out the live demo of Portfolio Builder: [Portfolio Builder Demo](https://ruccess.site)

## How to Deploy Your Portfolio

1. **Select a Theme:**
    - Visit the Portfolio Builder website and Pick a theme that suits your style

2. **Input Your Information:**
    - input your personal information, work experience, and portfolio details.

3. **Download Your Portfolio:**
    - Download the dynamically generated static files in a zip format.

4. **Deploy on GitHub Pages:**
    - Follow the detailed instructions below to create your own website using the 'Deployment (Using GitHub Pages)' section.

## Key Features
- Easy input of personal information, work experience, and portfolio details
- Dynamic generation of static HTML, CSS, and JS files
- Variety of themes to choose from
- Seamless deployment on GitHub Pages
- Portfolio data is stored in JSON format and included in the downloaded zip file.( Even if you're unfamiliar with JSON, don't worry! It's just a file to store information, and in this project, we don't keep or store it.)

## Development Status

The project is currently under development, and some parts may not be complete. Feedback and the development progress can be tracked through issues.

## Development Environment

  <img src="https://static.ruccess.site/team-soho.svg" />

- Frontend: [portfolio-builder-front](https://github.com/team-soho/portfolio-builder-front) (Developer: [yuuthod](https://https://github.com/yuuthod) )
- Backend: [portfolio-builder-back](https://github.com/team-soho/portfolio-builder-back) (Developer: [ruccess](https://https://github.com/ruccess) )


  
## Deployment (Using GitHub Pages)

1. **Create a Project Repository:**
    - Click the "+" button on GitHub and select "New repository."
    - Specify the repository name and choose the option to create a README file.

2. **Upload the Project:**
    - Navigate to the local project folder.
    - Initialize the project with Git and link it to the GitHub Repository.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <GitHub Repository URL>
   git push -u origin master
   ```
3. **Configure GitHub Pages:**
   - Go to the "Settings" tab on the GitHub Repository page.
   - Scroll down to the "GitHub Pages" section, choose "Source," and configure it.
   - Typically, select "master branch" or "main branch" and save.
4. **Check the Website:**
   - After configuring GitHub Pages, the deployed website can be checked after a few minutes.
   - The address is the GitHub Pages URL, including the specified repository name.

## Installation

- ```bash
    $ yarn install
    ```

## Running the app

-   ```bash
    # watch mode
    $ yarn run start:dev
    ```

## Test

-   ```bash
    # unit tests
    $ yarn run test
    
    # e2e tests
    $ yarn run test:e2e
    
    # test coverage
    $ yarn run test:cov
    ```
