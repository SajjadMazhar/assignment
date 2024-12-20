import React from "react";

interface ButtonInterface {
    isTitleValid: boolean;
    isTimeValid: boolean;
    editing?:boolean
}

const Button: React.FC<ButtonInterface> = ({ isTitleValid, isTimeValid, editing=false }) => {
    return (
        <button
            type="submit"
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                isTitleValid && isTimeValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
            }`}
            // disabled={!isTitleValid || !isTimeValid}
        >
            {editing ? 'Save Changes' : 'Add Timer'}
        </button>
    );
};

export default Button;
