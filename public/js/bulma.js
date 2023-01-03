document.addEventListener('DOMContentLoaded', function () {

  const $dropdown = document.querySelector('.dropdown');
  const $dropItems = document.querySelectorAll('.dropdown-item');

  if($dropdown) $dropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    $dropdown.classList.toggle('is-active');
  });

  if($dropItems) $dropItems.forEach( (item) => {
    item.addEventListener('click', (e) => {
      document.querySelector('a.dropdown-item.is-active').classList.remove('is-active');
      e.target.classList.add('is-active');
    });
  });

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});