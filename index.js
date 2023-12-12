import {
    MailinatorClient,
    GetInboxRequest,
    GetMessageRequest,
    GetLinksRequest,
    DeleteInboxMessagesRequest,
    DeleteMessageRequest,
} from 'mailinator-client';

import dotenv from 'dotenv';
dotenv.config();

const mailinatorClient = new MailinatorClient(process.env.API_KEY);

/**
 * Fetches and logs the inbox from a specific Mailinator client request.
 * @param {string} domain The domain name for the inbox.
 */
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

// Example usage
getInbox(process.env.DOMAIN);

/**
 * Fetches and logs a specific message from a Mailinator client request.
 * @param {string} domain The domain name.
 * @param {string} inbox The inbox name.
 * @param {string} messageId The ID of the message to retrieve.
 */
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

// Example usage
getMessage(process.env.DOMAIN, process.env.INBOX, process.env.MESSAGE_ID);

/**
 * Fetches and logs links from a specific Mailinator client request.
 * @param {string} domain The domain name.
 * @param {string} inbox The inbox name.
 * @param {string} messageId The ID of the message containing the links.
 */
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

// Example usage
getLinks(process.env.DOMAIN, process.env.INBOX, process.env.MESSAGE_ID);

/**
 * Deletes messages in a specified inbox using the Mailinator client.
 * @param {string} domain The domain name for the inbox.
 * @param {string} inbox The name of the inbox whose messages are to be deleted.
 */
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

// Example usage
deleteInboxMessages(process.env.DOMAIN, process.env.INBOX);

/**
 * Deletes a specific message from a Mailinator inbox.
 * @param {string} domain The domain name.
 * @param {string} inbox The name of the inbox.
 * @param {string} messageId The ID of the message to be deleted.
 */
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

// Example usage
deleteMessage(process.env.DOMAIN, process.env.INBOX, process.env.MESSAGE_ID);
