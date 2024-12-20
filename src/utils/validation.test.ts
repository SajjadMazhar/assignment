import { describe, it, expect, vi } from "vitest";
import { validateTimerForm, TimerFormData } from "./validation";
import { toast } from "sonner";

describe("validateTimerForm", () => {
    vi.spyOn(toast, "error").mockImplementation(() => {});

    it("should show an error if the title is empty", () => {
        const data: TimerFormData = {
            title: "",
            description: "Description",
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        const result = validateTimerForm(data);

        // Check that toast.error was called with the correct message
        expect(toast.error).toHaveBeenCalledWith("Title is required");
        expect(result).toBe(false);
    });

    it("should show an error if the title is longer than 50 characters", () => {
        const data: TimerFormData = {
            title: "A very long title that exceeds the character limit of fifty characters",
            description: "Description",
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        const result = validateTimerForm(data);

        expect(toast.error).toHaveBeenCalledWith(
            "Title must be less than 50 characters"
        );
        expect(result).toBe(false);
    });

    it("should show an error if the time values are negative", () => {
        const data: TimerFormData = {
            title: "Valid Title",
            description: "Description",
            hours: -1,
            minutes: 10,
            seconds: 10,
        };

        const result = validateTimerForm(data);

        expect(toast.error).toHaveBeenCalledWith(
            "Time values cannot be negative"
        );
        expect(result).toBe(false);
    });

    it("should show an error if minutes or seconds are greater than 59", () => {
        const data: TimerFormData = {
            title: "Valid Title",
            description: "Description",
            hours: 1,
            minutes: 60,
            seconds: 10,
        };

        const result = validateTimerForm(data);

        expect(toast.error).toHaveBeenCalledWith(
            "Minutes and seconds must be between 0 and 59"
        );
        expect(result).toBe(false);
    });

    it("should show an error if the total time is 0", () => {
        const data: TimerFormData = {
            title: "Valid Title",
            description: "Description",
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        const result = validateTimerForm(data);

        expect(toast.error).toHaveBeenCalledWith(
            "Please set a time greater than 0"
        );
        expect(result).toBe(false);
    });

    it("should show an error if the total time exceeds 24 hours", () => {
        const data: TimerFormData = {
            title: "Valid Title",
            description: "Description",
            hours: 25,
            minutes: 0,
            seconds: 0,
        };

        const result = validateTimerForm(data);

        expect(toast.error).toHaveBeenCalledWith(
            "Timer cannot exceed 24 hours"
        );
        expect(result).toBe(false);
    });

    it("should return true if all validation passes", () => {
        const data: TimerFormData = {
            title: "Valid Title",
            description: "Description",
            hours: 1,
            minutes: 30,
            seconds: 0,
        };

        const result = validateTimerForm(data);

        expect(result).toBe(true);
    });
});
