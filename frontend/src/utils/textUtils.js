/**
 * Handles the bold command (Cmd+B or Ctrl+B) for text inputs/textareas.
 * Wraps selected text in asterisks (*).
 * 
 * @param {Event} e - The keyboard event
 * @param {Function} onChange - The change handler function (expects synthetic event)
 */
export const handleBoldCommand = (e, onChange) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();

        const { selectionStart, selectionEnd, value, name } = e.target;

        // If no text is selected, do nothing or maybe insert **? 
        // Let's just wrap whatever is selected, even if empty (cursor position)

        const before = value.substring(0, selectionStart);
        const selected = value.substring(selectionStart, selectionEnd);
        const after = value.substring(selectionEnd);

        const newValue = `${before}*${selected}*${after}`;

        // Create synthetic event
        const syntheticEvent = {
            target: {
                name,
                value: newValue
            }
        };

        onChange(syntheticEvent);

        // Restore selection (optional, but good UX)
        // We need to wait for the render cycle to complete usually, 
        // but since we are controlling the input, we might need a ref or useEffect in the component.
        // For now, let's just update the value. The cursor might jump to the end.
        // Improving cursor position would require passing a ref or setting state in the component.
        // Given the constraints, we'll start with just updating the value.

        // Attempt to set selection immediately (might be overridden by React re-render)
        setTimeout(() => {
            e.target.selectionStart = selectionStart + 1;
            e.target.selectionEnd = selectionEnd + 1;
        }, 0);
    }
};
