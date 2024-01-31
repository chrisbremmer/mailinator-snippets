// MailinatorService.ts
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

export class MailinatorService {
    private client: MailinatorClient;

    constructor(apiKey: string) {
        this.client = new MailinatorClient(apiKey);
    }

    /**
     * Fetches the first message ID from a specific inbox.
     * @param {string} domain The domain name associated with the Mailinator inbox.
     * @returns {Promise<string|null>} The ID of the first message or null if not found.
     */
    async getInbox(domain: string): Promise<string | null> {
        try {
            const response = await this.client.request(
                new GetInboxRequest(domain)
            );
            console.log('Inbox:', response.result?.msgs[0].id);
            return response.result?.msgs[0].id!;
        } catch (error) {
            console.error('Error:', error.message || error);
            return null;
        }
    }

    /**
     * Extracts the reset password URL from an email body.
     * @param {string} emailBody The body of the email.
     * @returns {string} The found reset password URL.
     */
    extractResetPasswordUrl(emailBody: string): string {
        const resetPasswordRegex = /https?:\/\/[^ ]*\/account\/reset[^ ]*/;
        const matches = emailBody.match(resetPasswordRegex);

        if (matches && matches[0]) {
            return matches[0];
        }

        throw new Error('Reset password URL not found in the email body.');
    }

    /**
     * Fetches and logs a specific message from a Mailinator inbox.
     * @param {string} domain The domain name.
     * @param {string} inbox The inbox name.
     * @param {string} messageId The ID of the message.
     * @returns {Promise<string|null>} The reset password URL or null if an error occurred.
     */
    async getMessage(
        domain: string,
        inbox: string,
        messageId: string
    ): Promise<string | null> {
        try {
            const response = await this.client.request(
                new GetMessageRequest(domain, inbox, messageId)
            );
            const { parts } = response.result ?? {};
            const body = parts?.[0]?.body ?? ''; // Ensure there's a default empty string
            const resetPasswordUrl = this.extractResetPasswordUrl(body);

            console.log('Reset Password URL:', resetPasswordUrl);
            return resetPasswordUrl;
        } catch (error) {
            console.error('Error:', error.message || error);
            return null;
        }
    }

    /**
     * Fetches and logs links from a specific Mailinator client request.
     * @param {string} domain The domain name.
     * @param {string} inbox The inbox name.
     * @param {string} messageId The ID of the message containing the links.
     * @returns {Promise<any>} The specific link or logs an error.
     */
    async getLinks(
        domain: string,
        inbox: string,
        messageId: string
    ): Promise<any> {
        try {
            const response = await this.client.request(
                new GetLinksRequest(domain, inbox, messageId)
            );
            const links = response.result?.links ?? [];
            console.log('Links:', links[7]);
            return links[7];
        } catch (error) {
            console.error('Error:', error.message || error);
        }
    }

    /**
     * Deletes all messages within a specified Mailinator inbox.
     * @param {string} domain The domain name.
     * @param {string} inbox The inbox name.
     */
    async deleteInboxMessages(domain: string, inbox: string) {
        try {
            const response = await this.client.request(
                new DeleteInboxMessagesRequest(domain, inbox)
            );
            console.log(`Deleted messages count: ${response.result?.count}`);
        } catch (error) {
            console.error('Error:', error.message || error);
        }
    }

    /**
     * Deletes a specific message from a Mailinator inbox.
     * @param {string} domain The domain name.
     * @param {string} inbox The inbox name.
     * @param {string} messageId The ID of the message to delete.
     */
    async deleteMessage(domain: string, inbox: string, messageId: string) {
        try {
            const response = await this.client.request(
                new DeleteMessageRequest(domain, inbox, messageId)
            );
            console.log(`Deleted message: ${response.result?.count}`);
        } catch (error) {
            console.error('Error:', error.message || error);
        }
    }
}
