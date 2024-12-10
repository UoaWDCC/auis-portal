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
    return text.length > 0 && text.length < 99;
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
    const regex = text
      .toLowerCase()
      .match(/^(([0-9\ \+\_\-\,\.\^\*\?\$\^\#\(\)])|(ext|x)){1,20}$/);
    return text.length > 6 && text.length < 20 && regex !== null;
  }

  static validateAnswers(
    text: {
      answer: string;
    }[]
  ) {
    var valid: boolean = true;
    text.map((item) => {
      if (item.answer.length > 50) {
        valid = false;
      }
    });
    return valid;
  }
}
