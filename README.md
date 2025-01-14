# Gossip Site

This is a Flask application that allows users to post messages, like messages, and reply to messages. The messages are displayed as cards with a cool, secretive background.

## Features

- Post messages
- Like messages (one like per user per message)
- Reply to messages
- Cool, secretive background with moving text

## Requirements

- Python 3.x
- Flask
- Systemd (for running the application as a service)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/martagenovese/gossip.git
cd gossip 
```

2. Install the required Python packages

3. Create a `messages.json` file in the project directory:
```sh
touch messages.json
```

4. Place your `favicon.ico` file in the `public` directory.

## Running the Application

```sh
flask run
```