/*COMP 229-Express Portfolio Authentication - Student name: Arpan Gohel - StudentID:300565463 - Oct26,2022*/

(function() {

    function Start()
    {
          console.log("App Started...");

          let deleteButtons = document.querySelectorAll('.btn-danger')

          for(button of deleteButtons)
          {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
          }
    }
    window.addEventListener("load", Start);
})();