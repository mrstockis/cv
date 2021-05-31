

function CreateContactInfo(head=false) 
{
  content = `
    ${ head ? "<h3> Contact</h3>" : "" }
    <p>
      <span class="pop">022 465 0558</span> &nbsp; <span class="pop">mickem90@gmail.com</span><br>
      <em><span class="pop">25 Finch Street, Albert Town 9305, Otago</span></em>
    </p>
  `
    
    
    document.getElementById('contact-info-container').innerHTML = content;

}


