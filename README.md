# Simulator for Bioassay
## Summary
- This program is a computer-based simulator
   that reproduces the bioassay training items
   used in student training at Matsumoto Dental University.


## How to run
- Access [this page](https://toshi-ara.github.io/sim-bioassay).


## About training procedures
### Procedures for animal experiments on which the simulator is based
1. Preparation
    - Determine the lidocaine dose and number of mice in each group
    - Prepare the lidocaine solution
1. Experiments
    - Inject lidocaine intraperitoneally to mice to achieve the specified dose
    - Place the mouse on a wire mesh tilted at a 45° angle
    - A convulsion is considered to have occurred
      if the mouse slides down the wire mesh by more than 15 cm.
      Death is considered to have occurred if no movement is observed.
1. Calculation of the TD<sub>50</sub> and LD<sub>50</sub>
    - Calculate using probit regression analysis

### How to use the simulator
#### Initial Screen
1. Select the language from the pull-down menu at the bottom of the screen
   (the following explanation is for the Japanese screen).
1. Press the "Experiment" button to go to the Experiment screen.
1. Press the "TD<sub>50</sub>/LD<sub>50</sub> calculation" button
    to go to the Calculation screen.
1. Press the "Settings" button to go to the Settings screen.
    - Turn movie playback on/off
    - Set the dose (for TD<sub>50</sub> or LD<sub>50</sub>).

#### Experiment Screen
1. Mouse weights are displayed.
   Select the drug concentration to be used from the pull-down menu and
   calculate the dose.
1. If necessary, select the evaluation time (maximum observation time)
   from the pull-down menu.
1. Press the "Administration" button to play the video and display the results.
1. Press "NewExp." button and then start the next experiment.
1. Press the "Back" button to return to the initial screen.

#### TD<sub>50</sub>/LD<sub>50</sub> Calculation Screen
1. Enter the number of animals in each group in "Total"
    and the number of responding animals in "Response"
1. Press the "Calculate" button to display the results, table, and graph.
1. Press the "Back" button to return to the initial screen.

#### Settings Screen
1. Select whether to turn video playback on or off from the pull-down menu.
1. Select the dose settings (for TD<sub>50</sub> and LD<sub>50</sub>).
1. Press the "Change" button to apply the changes;
   press the "Cancel" button to return to the initial screen
    without applying the changes.


### Notes on this simulator
- This simulator is modeled based on actual training results,
   but it may not necessarily yield the same results as animal experiments.


## Reference
A paper on the model formula and parameter values used in this simulator.

- Ara T, Kitamura H, Hung Y-C, Uchida K-i.
  Construction and Evaluation of a Statistical Model
   for a Probit Method Simulator in Pharmacological Education.
  Applied Biosciences. 2025; 4(4):50.
  (https://doi.org/10.3390/applbiosci4040050)
- Zenodo (https://doi.org/10.5281/zenodo.17406038)


## How to build the environment (for teachers)
- Since it is released under the MIT License,
  it can be used and modified for both commercial and non-commercial purposes.
- Build the environment using one of the following methods.
    1. Access the page published on GitHub
        - https://toshi-ara.github.io/sim-bioassay
        - This is the easiest,
          and I think it would be a good idea to post this link
          on a page that is easy for students to access
          (such as a classroom-specific page).
    1. Install on your own web server (**Please consult an expert**)
        - When you click the `Code` button on this page,
          `Download ZIP` will be displayed,
          so click it. A file named `sim-bioassay-main.zip` will be saved.
        - Unzip the file,
        - Place the contents of the above `docs` folder
           in the appropriate location on the web server
           (Please change the folder name as appropriate).
        - You can use the simulator by accessing the web server.


## When changing the source code (for developers only)
### How to display license
- If you want to modify program, please edit the `LICENSE` file.
  Please add the copyright holder after `Copyright (c) 2025 ARA Toshiaki`
   and include this `LICENSE` file in the source code.

### How to build the code
- Requires npm (JavaScript package management system)
- Run the following command with npm installed

```bash
git clone https://github.com/toshi-ara/sim-bioassay.git
# git clone git@github.com:toshi-ara/sim-bioassay.git  # when ssh is used
cd simla-ts

npm install
npm run build
```


## ChangeLog
### v1.0.2 (2025-11-27)
- move ts and css folder to src folder
- delete docs folder

### v1.0.1 (2025-11-25)
- Change movie file to mp4

### v1.0.0 (2025-11-23)
- Initial release

## About this program
- Author: Matsumoto Dental University, Department of Pharmacology, Toshiaki Ara
- Year:2025
- License: MIT License
