$(function () {

 
  $(".idEdit_data").click(function () {
    const dataCustomers = $(this).data("customer")
    const actionForm = $('#edit-form')
          
    var urlEdit = '/panel/customers/edit/' + dataCustomers

    actionForm.prop('action', urlEdit)
    
    $.ajax({
      url: "/panel/customers/" + dataCustomers,
      success: function (res) {
        $("#fullname-customer").val(res[0].customer_fullname);
        if (res[0].status_contact === 0) {
          $("#uncontacted").prop("checked", true);
        } else {
          $("#contacted").prop("checked", true);
        }
      }
    })

  })

  $(".contacted").click(function() {
    return false
  })

})
