import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding: 1rem;
`;

export const ChatBox = styled.div`
  width: 100%;
  max-width: 700px;
  height: 80vh;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
`;

export const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MessageBubble = styled.div<{ $sender: string }>`
  max-width: 80%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  white-space: pre-line;
  ${({ $sender }) =>
    $sender === "user"
      ? `
    background: #2563eb;
    color: white;
    border-bottom-right-radius: 0;
  `
      : `
    background: #e5e7eb;
    color: #111827;
    border-bottom-left-radius: 0;
  `}
`;

export const InputBar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  background: white;
  color: black;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
`;

export const SendButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1e40af;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FileUploadBar = styled.div`
  padding: 1rem;
  padding-top: 0;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const UploadLabel = styled.label`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

export const UploadInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const UploadButton = styled.div`
  background-color: #f3f4f6;
  border: 2px dashed #9ca3af;
  color: #374151;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    border-color: #6b7280;
  }
`;

export const UploadStatus = styled.span`
  font-size: 0.875rem;
  color: #047857;
  padding-left: 1rem;
`;
