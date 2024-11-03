import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from './Portfolio';

class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }

    observe(element) {
        this.callback([
            {
                isIntersecting: true,
                target: element
            }
        ]);
    }

    unobserve() { }
    disconnect() { }
}

global.IntersectionObserver = MockIntersectionObserver;

const mockAlert = jest.fn();
global.alert = mockAlert;

global.fetch = jest.fn();

describe('Portfolio Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockAlert.mockClear();

        global.fetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Success' })
            })
        );
    });

    it('rend le formulaire de contact', () => {
        render(<Component />);
        expect(screen.getByPlaceholderText('Votre Nom et Prénom')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Votre Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Objet')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument();
    });

    it('soumet le formulaire avec succès', async () => {
        render(<Component />);

        fireEvent.change(screen.getByPlaceholderText('Votre Nom et Prénom'), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByPlaceholderText('Votre Email'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Objet'), {
            target: { value: 'Sujet Test' },
        });
        fireEvent.change(screen.getByPlaceholderText('Message'), {
            target: { value: 'Message de test' },
        });

        fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'John Doe',
                    email: 'john@example.com',
                    subject: 'Sujet Test',
                    message: 'Message de test',
                }),
            });
        });

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Message sent successfully!');
        });
    });

    it('gère les erreurs de soumission de formulaire', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 500
            })
        );

        render(<Component />);

        fireEvent.change(screen.getByPlaceholderText('Votre Nom et Prénom'), {
            target: { value: 'Jane Doe' },
        });
        fireEvent.change(screen.getByPlaceholderText('Votre Email'), {
            target: { value: 'jane@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('Objet'), {
            target: { value: 'Error Test' },
        });
        fireEvent.change(screen.getByPlaceholderText('Message'), {
            target: { value: 'This should trigger an error' },
        });

        fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Error sending message. Please try again.');
        });
    });
});