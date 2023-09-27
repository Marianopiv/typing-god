import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: "top",
    iconColor: "white",
    background:"#008f39",
    color:"white",
    customClass: {
      popup: "colored-toast swal2-icon-success",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });