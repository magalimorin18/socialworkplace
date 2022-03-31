# Social Workplace

## Students

[Hugues Baratgin](https://github.com/Xseuguh)
[Magali Morin](https://github.com/magalimorin18)

#### Due date

:calendar: **9/12/2021** Soutenance intermédiaire
:calendar: **13/04/2022** Soutenance finale

## :books: Subject of the project

Build a social workplace, integrated on a software that helps people who are working from home to feel more integrated.

To do so we will:

1. Create a front end witg React
2. Create a back end with C#
3. Connect the back end to microsoft API
4. Integrate our solution on teams

## :runner: Running the code locally

### Front

#### Configuration

In order to work, the front needs parameters that it gets from the `.env` file:

_-_ `REACT_APP_BACKEND_URL`: the backend url (mandatory).

_-_ `REACT_APP_GA_ID`: the Google Analytics id (not mandatory)

#### Run it

To run only the React app. From the `frontend/tabs/` folder, run in console `npm i` (at the first run) then `npm start`.

To run the app as a Teams app, **on VSCode** just press f5 (or in the tab `Run an debug` click on the debug button)

### Back

#### Configuration

In order to work, the back needs parameters that it gets from the `appsettings.json` file. You will need to add 3 new objects:

_-_ `AzureAd`, that will have 4 parameters:

- `Instance`: a string, `https://login.microsoftonline.com/`.
- `ClientId`: a string, the app id.
- `TenantId`: a string, the tenant id.
- `ClientSecret`: a string, the secret for the app.

_-_ `Teams`, that will have 1 parameter:

- `TeamId`: an object that use a tenant id as key with a teams group id as value. You can use it to set a different group id for the dev and the deploy.

_-_ `FrontEnd`, that will have 1 parameter:

- `Url`: a string, the url of the frontend.

It should looks like this:

```bash
{
    ...

  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "ClientId": "[Id of the app]",
    "TenantId": "[Tenant id]",
    "ClientSecret": "[Secret]"
  },

  "Teams": {
    "TeamId": {
      "[TenantIdForDev]": "[Teams group id for dec]",
      "[TenantIdForDeploy]": "[Another Teams group id]"
    }
  },

  "FrontEnd": {
    "Url": "[Url of the front]"
  }
}
```

#### Run it

In console run the command `dotnet run`.

### Azure Ad configuration

In order to be able to call the Microsoft Graph API, we need to register the application on [Microsoft Azure](https://portal.azure.com).
This app will need some permissions.
In `API permissions` >> click on Add a permission, and add the following Microsoft Graph permissions:

- Delegated permissions:

  - `Channel.ReadBasic.All`, to be able to get all the channel a user is in.

- Application permissions:
  - `Channel.Create`, to be able to add a new channel.
  - `Channel.Delete.All`, to be able to delete a channel.
  - `Channel.ReadBasic.All`, to be able to get all the channels.
  - `ChannelMember.ReadWrite.All`, to be able to add and remove a user from a channel.

To use the Microsoft authentication in the front, we need to add some client application.
In `Expose an API` >> `Add a client application`, and add the followings clients id:

- `1fec8e78-bce4-4aaf-ab1b-5451cc387264`
- `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`
- `4345a7b9-9a63-4910-a426-35363201d503`
- `4765445b-32c6-49b0-83e6-1d93765276ca`
- `d3590ed6-52b3-4102-aeff-aad2292ab01c`

## :package: Organisation of the project

### Structure

```bash
├── backend
│   └── to complete
├── font-end
│   └── to complete
└── README.md

```
