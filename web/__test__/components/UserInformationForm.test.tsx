import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserInformationForm from "../../src/components/UserInformationForm";
import React from 'react';

describe('UserInformationForm Component', () => {
    it('renders the form', () =>{
        render(<UserInformationForm />);
        expect(screen.getByText(/Thanks for Joining/i)).toBeInTheDocument();
    })

    it('validates form fields', () => {
        render(<UserInformationForm />);
    
        const submitButton = screen.getByText(/Purchase membership/i);
        fireEvent.click(submitButton);
    
        expect(screen.getByText(/First Name is Required/i)).toBeInTheDocument();
        expect(screen.getByText(/Last Name is Required/i)).toBeInTheDocument();
        expect(screen.getByText(/Your University is Required/i)).toBeInTheDocument();
        expect(screen.getByText(/Your Graduation Year is Required/i)).toBeInTheDocument();
        expect(screen.getByText(/Membership Type is Required/i)).toBeInTheDocument();
      });

      

})
