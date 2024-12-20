import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TimerItem } from './TimerItem';
import { Timer } from '../types/timer';
import { useTimerStore } from '../store/useTimerStore';
import { vi, it, describe } from 'vitest';

// Sample Timer data
const timer: Timer = {
  id: 1,
  title: 'Sample Timer',
  description: 'Test description',
  remainingTime: 1000,
  duration: 5000,
  isRunning: true,
};

// Mocking the useTimerStore hook
vi.mock('../store/useTimerStore', () => ({
  useTimerStore: vi.fn(() => ({
    toggleTimer: vi.fn(),
    deleteTimer: vi.fn(),
    updateTimer: vi.fn(),
    restartTimer: vi.fn(),
  })),
}));

describe('TimerItem', () => {
  it('should render the timer title and description', () => {
    render(<TimerItem timer={timer} />);
    
    // Verify the timer title and description are displayed
    expect(screen.getByText(timer.title)).toBeInTheDocument();
    expect(screen.getByText(timer.description)).toBeInTheDocument();
  });

  it('should call toggleTimer when clicking the toggle button', () => {
    const toggleTimerMock = vi.fn();
    useTimerStore.mockReturnValueOnce({
      toggleTimer: toggleTimerMock,
      deleteTimer: vi.fn(),
      updateTimer: vi.fn(),
      restartTimer: vi.fn(),
    });
    
    render(<TimerItem timer={timer} />);
    
    // Find and click the toggle button
    fireEvent.click(screen.getByTitle('Pause Timer'));
    
    // Verify toggleTimer was called with correct timer id
    expect(toggleTimerMock).toHaveBeenCalledWith(timer.id);
  });

  it('should call restartTimer when clicking the restart button', () => {
    const restartTimerMock = vi.fn();
    useTimerStore.mockReturnValueOnce({
      toggleTimer: vi.fn(),
      deleteTimer: vi.fn(),
      updateTimer: vi.fn(),
      restartTimer: restartTimerMock,
    });

    render(<TimerItem timer={timer} />);
    
    // Find and click the restart button
    fireEvent.click(screen.getByTitle('Restart Timer'));
    
    // Verify restartTimer was called with the correct timer id
    expect(restartTimerMock).toHaveBeenCalledWith(timer.id);
  });

  it('should call deleteTimer when clicking the delete button', () => {
    const deleteTimerMock = vi.fn();
    useTimerStore.mockReturnValueOnce({
      toggleTimer: vi.fn(),
      deleteTimer: deleteTimerMock,
      updateTimer: vi.fn(),
      restartTimer: vi.fn(),
    });

    render(<TimerItem timer={timer} />);
    
    // Find and click the delete button
    fireEvent.click(screen.getByTitle('Delete Timer'));
    
    // Verify deleteTimer was called with correct timer id
    expect(deleteTimerMock).toHaveBeenCalledWith(timer.id);
  });

  it('should open the edit modal when clicking the edit button', () => {
    render(<TimerItem timer={timer} />);
    
    // Find and click the edit button
    fireEvent.click(screen.getByTitle('Edit Timer'));
    
    // Verify that the modal opens by checking for the dialog
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should display the correct timer remaining time', () => {
    render(<TimerItem timer={timer} />);
    
    // Verify the correct remaining time is displayed
    expect(screen.getByText('16:40')).toBeInTheDocument();  // Assuming 1000ms remaining time -> formatted as 00:16
  });

  it('should show the timer progress correctly', () => {
    render(<TimerItem timer={timer} />);
    
    // Verify that the progress bar is rendered
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    // Check that the progress is approximately the expected value (1000/5000 = 20%)
    expect(progressBar).toHaveStyle('width: 20%');
  });
});
