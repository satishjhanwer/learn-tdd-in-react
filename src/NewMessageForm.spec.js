import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import NewMessageForm from "./NewMessageForm";

describe("NewMessageForm", () => {
  it("renders the input field and send button", () => {
    const onSend = jest.fn();
    render(<NewMessageForm onSend={onSend} />);
    expect(screen.getByTestId("messageText")).toBeInTheDocument();
    expect(screen.getByTestId("sendButton")).toBeInTheDocument();
  });

  it("calls the onSend callback with the input text when the send button is clicked", () => {
    const onSend = jest.fn();
    render(<NewMessageForm onSend={onSend} />);
    const inputField = screen.getByTestId("messageText");
    const sendButton = screen.getByTestId("sendButton");

    fireEvent.change(inputField, { target: { value: "Hello, World!" } });
    fireEvent.click(sendButton);

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledWith("Hello, World!");
  });

  it("clears the input field after sending the message", async () => {
    const onSend = jest.fn();
    render(<NewMessageForm onSend={onSend} />);
    const inputField = screen.getByTestId("messageText");
    const sendButton = screen.getByTestId("sendButton");

    fireEvent.change(inputField, { target: { value: "Hello, World!" } });
    fireEvent.click(sendButton);

    await waitFor(() => expect(inputField.value).toBe(""));
  });
});
