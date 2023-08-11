import Swal from "sweetalert2";

export const Alert = {
  /**
   * Show custom message error
   * @param {string} message - Custom error message
   * @return {Promise} - Error alert instance swal
   */
  showError: (message) => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      footer: "Intente más tarde",
    });
  },

  /**
   * Show custom message success
   * @param {string} title - Custom success title
   * @param {string} message - Custom success message
   * @return {Promise} - Success alert instance swal
   */
  showSuccess: (title, message) => {
    return Swal.fire({
      title: title,
      html: message,
      icon: "success",
      timer: 2000,
    });
  },

  /**
   * Show custom message confirm
   * @param {string} message - Custom confirm message question
   * @return {Promise} - confirm alert instance swal
   */
  showConfirm: (message) => {
    return Swal.fire({
      title: "Está seguro?",
      html: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    });
  },
};
