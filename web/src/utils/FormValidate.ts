export class FormValidate {
  static validateEmail(text: string): boolean {
    const regex = text
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return text.length > 2 && text.length < 99 && regex !== null;
  }

  static validateName(text: string) {
    const trimmed = text.trim();
    return trimmed.length > 0 && trimmed.length < 99;
  }

  static validateAll(
    name: string,
    email: string,
    phoneNumber: string,
    answers: {
      answer: string;
    }[]
  ) {
    return (
      this.validateEmail(email) &&
      this.validateName(name) &&
      this.validatePhoneNumber(phoneNumber) &&
      this.validateAnswers(answers)
    );
  }

  static validatePhoneNumber(text: string) {
    const trimmed = text.trim();
    const regex = trimmed
      .toLowerCase()
      .match(/^(([0-9\ \+\_\-\,\.\^\*\?\$\^\#\(\)])|(ext|x)){1,20}$/);
    return trimmed.length > 6 && trimmed.length < 20 && regex !== null;
  }

  static validateAnswers(
    text: {
      answer: string;
    }[]
  ) {
    var valid: boolean = true;
    text.map((item) => {
      const trimmed = item.answer.trim();
      if (trimmed.length === 0 || trimmed.length > 50) {
        valid = false;
      }
    });
    return valid;
  }
}
