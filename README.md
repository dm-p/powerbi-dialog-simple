# powerbi-dialog-simple

Simple test of the Power BI Visuals Dialog API. This is a variation of the basic visual, where instead of incrementing a count property based on the number of visual updates, this will be set based on the number of times the dialog is opened.

## Getting Started

### Install Packages

```
npm i
```

### Generate Power BI Visuals Certificate and Install

```
npm run cert
```

Note that this may need to be run twice - once to generate the certificate and passphrase, and then again to prompt for installation.

Add the certificate to **Trusted Root Certification Authorities**. If not using Windows you may need to [refer to the doc here](https://docs.microsoft.com/en-us/power-bi/developer/visuals/environment-setup) for how to add the certificate.

### Start Debugging

```
npm run start
```
