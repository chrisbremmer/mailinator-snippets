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

The `MailinatorService` class encapsulates the functionality to interact with Mailinator API. Below are the usage examples:

### Fetch Inbox

Fetches and logs the inbox from a specific Mailinator domain.

```typescript
import { MailinatorClient, GetInboxRequest } from 'mailinator-client';

class MailinatorService {
    private client: MailinatorClient;

    constructor(apiKey: string) {
        this.client = new MailinatorClient(apiKey);
    }

    async getInbox(domain: string): Promise<string | null> {
        try {
            const response = await this.client.request(
                new GetInboxRequest(domain)
            );
            console.log('Inbox:', response.result?.msgs[0].id);
            return response.result?.msgs[0].id;
        } catch (error) {
            console.error('Error:', error.message || error);
            return null;
        }
    }
}
```

### Fetch Message

Fetches and logs a specific message from a Mailinator inbox.

```typescript
import { GetMessageRequest } from 'mailinator-client';

async getMessage(domain: string, inbox: string, messageId: string): Promise<string | null> {
    try {
        const response = await this.client.request(new GetMessageRequest(domain, inbox, messageId));
        const body = response.result?.parts?.[0]?.body ?? '';
        console.log('Message Body:', body);
        return body;
    } catch (error) {
        console.error('Error:', error.message || error);
        return null;
    }
}
```

### Fetch Links from a Message

Retrieves and logs links from a specific message in a Mailinator inbox.

```typescript
import { GetLinksRequest } from 'mailinator-client';

async getLinks(domain: string, inbox: string, messageId: string): Promise<any> {
    try {
        const response = await this.client.request(new GetLinksRequest(domain, inbox, messageId));
        const links = response.result?.links ?? [];
        console.log('Links:', links);
        return links;
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}
```

### Delete Inbox Messages

Deletes all messages in a specified Mailinator inbox.

```typescript
import { DeleteInboxMessagesRequest } from 'mailinator-client';

async deleteInboxMessages(domain: string, inbox: string) {
    try {
        const response = await this.client.request(new DeleteInboxMessagesRequest(domain, inbox));
        console.log(`Deleted messages count: ${response.result?.count}`);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}
```

### Delete a Specific Message

Deletes a specific message from a Mailinator inbox.

```typescript
import { DeleteMessageRequest } from 'mailinator-client';

async deleteMessage(domain: string, inbox: string, messageId: string) {
    try {
        const response = await this.client.request(new DeleteMessageRequest(domain, inbox, messageId));
        console.log(`Deleted message: ${response.result?.count}`);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}
```

## Usage

To use these functions, instantiate the `MailinatorService` class with your API key, and call the methods with the appropriate parameters.
