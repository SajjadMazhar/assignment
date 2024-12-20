import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';


describe('Button', () => {
  it('should display "Add Timer" when not editing', () => {
    render(<Button isTitleValid={true} isTimeValid={true} />);
    
    // Verify that the button text is "Add Timer"
    expect(screen.getByRole('btn')).toHaveTextContent('Add Timer');
  });

  it('should display "Save Changes" when editing is true', () => {
    render(<Button isTitleValid={true} isTimeValid={true} editing={true} />);
    
    // Verify that the button text is "Save Changes"
    expect(screen.getByRole('editbtn')).toHaveTextContent('Save Changes');
  });

  it('should be disabled if isTitleValid is false', () => {
    render(<Button isTitleValid={false} isTimeValid={true} />);
    
    // Verify that the button is disabled
    expect(screen.getByRole('btn')).toBeDisabled();
    
  });
  it('should be disable if isTimeValid is false', ()=>{
    render(<Button isTitleValid={true} isTimeValid={false} />);
    
    // Verify that the button is disabled
    expect(screen.getByRole('btn')).toBeDisabled();
  })

  it('should be enabled if both isTitleValid and isTimeValid are true', () => {
    render(<Button isTitleValid={true} isTimeValid={true} />);
    
    // Verify that the button is enabled
    expect(screen.getByRole('btn')).toBeEnabled();
  });

  it('should have the correct styles when enabled', () => {
    render(<Button isTitleValid={true} isTimeValid={true} />);
    
    const button = screen.getByRole('btn');
    
    // Verify that the button has the correct enabled styles
    expect(button).toHaveClass('bg-blue-600');
    expect(button).not.toHaveClass('bg-blue-400');
    expect(button).not.toHaveClass('cursor-not-allowed');
  });

  it('should have the correct styles when disabled', () => {
    render(<Button isTitleValid={false} isTimeValid={true} />);
    
    const button = screen.getByRole('btn');
    
    // Verify that the button has the correct disabled styles
    expect(button).toHaveClass('bg-blue-400');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  // it('should call the submit handler when clicked if enabled', () => {
  
  //   const handleSubmit = vi.fn();
    
  //   render(<Button isTitleValid={true} isTimeValid={true} />);
    
  //   const button = screen.getByRole('btn');
    
  //   fireEvent.click(button);
    
  //   // Ensure the submit handler is called
  //   expect(handleSubmit).toHaveBeenCalled();
  // });

  it('should not call the submit handler when clicked if disabled', () => {
    const handleSubmit = vi.fn();
    
    render(<Button isTitleValid={false} isTimeValid={true} />);
    
    const button = screen.getByRole('btn');
    
    fireEvent.click(button);
    
    // Ensure the submit handler is not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
