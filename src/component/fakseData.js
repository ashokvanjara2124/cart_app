{

  registrationData &&

    registrationData.data &&

    registrationData.data.map((register, id) => {
        return (

          <>

            <option value={register.id} >{register.name}</option>

          </>

        );

      }

    )

}