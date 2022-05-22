import { SyntheticEvent } from "react";
import Picker from "emoji-picker-react";
import { EmojiObject, EmojiProps } from "../interfaces/Components";

export default function Emoji(props: EmojiProps) {
  const { chatForm, setChatForm } = props;

  const onEmojiClick = (event: SyntheticEvent, emojiObject: EmojiObject) => {
    const content = String.fromCodePoint(parseInt(emojiObject.unified, 16));
    setChatForm({
      ...chatForm,
      content,
    });
  };

  return (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus={true}
        groupNames={{ smileys_people: "PEOPLE" }}
        native
      />
    </div>
  );
}
