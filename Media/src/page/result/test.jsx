const upload = async (e) => {
  e.preventDefault();
  if (data.length > 0) {
      const question = data[0].question;
      const date = data[0].date;
      const name = data[0].name;

      try {
          const response = await axios.post(
              `${import.meta.env.VITE_SERVER}/api/dashboard/forum.php`,
              formatUploadData(id_user, question, answer, name, date),
              { withCredentials: true }
          );

          if (response.data.status === 'success') {
              console.log('Data successfully updated');
          } else {
              console.error('Error updating data:', response.data.message);
          }
      } catch (error) {
          console.error('Error updating data:', error);
      }
  }
};