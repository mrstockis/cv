

function CreateContactInfo(head=false) 
{
  content = `
    ${ head ? "<h3> Contact</h3>" : "" }
    <p>
      <span class="pop">+64 22 465 0558</span> &nbsp; <span class="pop">mickem90@gmail.com</span><br>

    </p>
  `
    // <em><span class="pop">18 Blue Jean Ave., Rolleston 7614</span></em>
    document.getElementById('contact-info-container').innerHTML = content;

}


