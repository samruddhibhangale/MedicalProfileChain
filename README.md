# MedicalProfileChain
# Pre-Requisites

Nodejs v8.x.0 (prefered version- v8.16.0 )

####### Step 1 ########
        cd /HealthChain/Integration\ Layer/

####### Step 2 ########
        nmp install

####### Step 3 ########        
        nodejs app.js
        
        
UI Link:-
        file://<FILEPATH>/HealthChain/UI/index.html
        
        
#### Interacting with the UI

-Doctor or Patient can login using their ID, public and private key.
-Login button will redirect to specific page according to selection.

****************************************Doctor's Interface****************************************
If doctor have registered before, his/her data would be diplayed. If not, they will get an option to register themselves in REGISTRATION BOX.

Docter can view the data of some patients in SEARCH PATIENT INFORMATION BOX (only if they have permission). 


****************************************Patient's Interface****************************************
If patient have registered before, his/her data would be diplayed. If not, they will get an option to register themselves in REGISTRATION BOX.

Patient can give permission to view their data to some docter in GIVE PERMISSION TO DOCTER BOX by providing their docter's public address.


****************************************Creadentails for Testing****************************************

****************************************Doctor Creadentails ****************************************
ID:             1
PUBLIC KEY:     0xb289a8cc4332031f42a7E54F10CF28FcE8a6BDb9
PRIVATE KEY:    957165f432c037ae32a99900f0d85e19d1f465510ed954885f815ad9ed075e65

****************************************Patient Creadentails****************************************
ID:             2
PUBLIC KEY:     0x3d8fc5dc2f1c3b00b0b4d64696953c60bffa20ff
PRIVATE KEY:    9542c2c1a2ca70abbab00954d648a134d4bfc51f0667d629af6ab5c1a4313300
 



