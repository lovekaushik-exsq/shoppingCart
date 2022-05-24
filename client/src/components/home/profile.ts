export const profile = () => {
    let first = true;
    const profile = document.getElementById('profile');
    const modal = document.getElementById('myModal');
    const data = localStorage.getItem('profile')!;
    const user = JSON.parse(data);
    document.getElementById('myModal')!.innerHTML = (`
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Name: ${user.userInfo.userName}</p>
          <p>Email: ${user.userInfo.userEmail}</p>
          <p>Phone Number: ${user.userInfo.userPhoneNumber}</p>
          <button id="logout">Logout</button>
        </div>
    `)
    const close = document.getElementsByClassName('close')[0];
    profile?.addEventListener('click', () => {
        modal!.style.display = 'block';
    });

    close.addEventListener('click', () => {
        modal!.style.display = 'none';
    })

    document.getElementById('logout')?.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html'
    })

    window.addEventListener('click', (event: Event) => {
        if (event.target == modal) {
            modal!.style.display = "none";
        } else if (first) {
            modal!.style.display = 'block';
            first = false;
        }
    })
}