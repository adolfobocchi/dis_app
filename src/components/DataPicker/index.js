import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';
import { MdCalendarMonth } from 'react-icons/md';
import { format  } from 'date-fns';
registerLocale('pt-BR', ptBR);

const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate;
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(year, month - 1, day);
};

const CustomInput = ({ value, onClick }) => {
  const formattedValue = value ? format(parseDate(value), 'dd/MM/yyyy', {locale: ptBR }) : ''; // Formate o valor da data
  return (
  
  <div>
    <input type="text" value={formattedValue} onClick={onClick} placeholder='dd/mm/aaaa' />
    <MdCalendarMonth onClick={onClick} />
  </div>
)};

const DataPicker = ({ name, control, setValue, defaultValue, showTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(defaultValue || getCurrentDate());

  useEffect(() => {
    if (defaultValue) {
      setSelectedDate(parseDate(defaultValue));
    }
  }, [defaultValue]);

  const handleChange = (date) => {
    
    setSelectedDate(date);
    const formattedDate = date ? format(date, showTimeSelect ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy', {locale: ptBR}) : ''; // Formate a data para o padrão pt-BR
    setValue(name, formattedDate, {
      shouldDirty: true,
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || getCurrentDate()}
      render={({ field }) => (
        <DatePicker
          {...field}
          selected={selectedDate}
          onChange={handleChange}
          showTimeSelect={showTimeSelect}
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat={showTimeSelect ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
          locale={ptBR}
          customInput={<CustomInput />}
        />
      )}
    />
  );
};

export default DataPicker;
