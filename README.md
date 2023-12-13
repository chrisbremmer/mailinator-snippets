# Mailinator Client Usage Examples

This README provides examples of how to use the Mailinator client in a Node.js environment. The code snippets demonstrate various functionalities such as fetching inboxes, retrieving messages, getting links from messages, and deleting messages or entire inboxes.

## Getting Started

Before using these examples, ensure you have installed the `mailinator-client` package and configured your environment with the necessary Mailinator API key.

### Installation

```bash
npm install mailinator-client
```

### Configuration

Create a `.env` file in your project root and add your Mailinator API key:

```
API_KEY=your_mailinator_api_key_here
DOMAIN=your_mailinator_domain
INBOX=your_mailinator_inbox
MESSAGE_ID=your_mailinator_message_id
```

## Examples

### Fetch Inbox

Fetches and logs the inbox from a specific Mailinator domain.

```javascript
const getInbox = async (domain) => {
    try {
        const response = await mailinatorClient.request(
            new GetInboxRequest(domain)
        );

        // Process the response as needed
        console.log('Inbox:', response.result);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
};
```

### Fetch Message

Fetches and logs a specific message from a Mailinator inbox.

```javascript
const getMessage = async (domain, inbox, messageId) => {
    try {
        const response = await mailinatorClient.request(
            new GetMessageRequest(domain, inbox, messageId)
        );

        const { subject, parts, headers } = response.result ?? {};

        console.log('Subject:', subject);
        // Process parts and headers as needed
    } catch (error) {
        console.error('Error:', error.message || error);
    }
};
```

### Fetch Links from a Message

Retrieves and logs links from a specific message in a Mailinator inbox.

```javascript
const getLinks = async (domain, inbox, messageId) => {
    try {
        const response = await mailinatorClient.request(
            new GetLinksRequest(domain, inbox, messageId)
        );

        // Use nullish coalescing for default empty array
        const links = response.result?.links ?? [];

        links.forEach((link) => {
            console.log(link);
        });
    } catch (error) {
        console.error('Error:', error.message || error);
    }
};
```

### Delete Inbox Messages

Deletes all messages in a specified Mailinator inbox.

```javascript
const deleteInboxMessages = async (domain, inbox) => {
    try {
        const response = await mailinatorClient.request(
            new DeleteInboxMessagesRequest(domain, inbox)
        );

        // Assuming you want to do something with the count of deleted messages
        const { count } = response.result ?? {};
        console.log(`Deleted messages count: ${count}`);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
};
```

### Delete a Specific Message

Deletes a specific message from a Mailinator inbox.

```javascript
const deleteMessage = async (domain, inbox, messageId) => {
    try {
        const response = await mailinatorClient.request(
            new DeleteMessageRequest(domain, inbox, messageId)
        );

        // Assuming you want to do something with the response
        const { count } = response.result ?? {};
        console.log(`Deleted messages count: ${count}`);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
};
```

## Usage

To use these functions, simply call them with the appropriate parameters as shown in the example usage comments in each function.
