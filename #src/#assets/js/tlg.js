gz.tlg = {
    URL: 'https://grummer-sender.herokuapp.com/sendMessage',
    // async sendCallBack(form)
    // {
    //     let msg = '*Заказ звонка*\n\n';

    //     msg += this.createMsg(form).replace('name', 'Клиент').replace('tel', 'Тел');

    //     return await this.sendMessage(msg);
    // },

    // createMsg(form)
    // {
    //     const inputs = $(form).find('input').toArray();

    //     return inputs.reduce((acc, input) => {
    //         acc += `#${input.name}: ${input.value}\n`
    //     }, '');
    // },

    // async sendMessage(msg)
    // {
    //     return await fetch(this.URL, {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(msg)
    //     })
    //     .then(response => response.status === 200)
    // }
}
