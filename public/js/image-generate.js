document.addEventListener('DOMContentLoaded', () => {
  const $generateBtn = document.getElementById('img-generate');
  const $loadingInd = document.getElementById('loading');

  async function generateImage(prompt, size) {
    try {
      isLoading(true);

      const response = await fetch('/img/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });

      if (!response.ok) {
        alert('Failed to generate image.');
        isLoading(false);
        return;
      }

      const data = await response.json();
      const imgLink = data.data;

      document.getElementById('img-generated').src = imgLink;
      isLoading(false);
    } catch (error) {
      alert('Failed to generate image.');
      isLoading(false);
      console.error(error);
    }
  }

  function isLoading(status) {
    if( status ) {
      $loadingInd.style.display = '';
    } else {
      $loadingInd.style.display = 'none';
    }
  }

  if($generateBtn) $generateBtn.addEventListener('click', () => {
    const prompt = document.getElementById('img-prompt').value;
    const size = document.querySelector('a.dropdown-item.is-active').getAttribute('value');

    if(prompt) {
      generateImage(prompt.trim(), size);
    } else {
      alert('Input field is empty.');
    }
  })

});