





function CreateMenu(proj=false) 
{
  /*
  content = `
  <table id="main-link-table">
      <tr>
        <td>
          <h2><a href="index.html"><span class="">H</span>ome</a></h2>
        </td>
        <td>
          <h2><a href="cover.html"><span class="">C</span>over</a></h2>
        </td>
        <td>
          <h2><a href="work.html"><span class="">W</span>ork</a></h2>
        </td>
        ${ (proj) ? ' \
        <td> \
          <h2><a href="projects.html"><span class="cap">P</span>rojects</a></h2> \
        </td>' : ''}
      </tr>
    </table>
    <div id="main-link-table-space"></div>`
    */
    
    content = `
    <ul class="main-menu-list">
      <li class="main-menu-element"> <h2 style="margin:0;padding:0"><a href="index.html"><span class="">H</span>ome</a></h2> </li>
      <li class="main-menu-element"> <h2 style="margin:0;padding:0"><a href="cover.html"><span class="">C</span>over</a></h2> </li>
      <li class="main-menu-element"> <h2 style="margin:0;padding:0"><a href="work.html"><span class="">W</span>ork</a></h2> </li>
    </ul>
    `
    
    document.getElementById('main-link-container').innerHTML = content;

}


//CreateMenu();
