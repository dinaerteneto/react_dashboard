import Option from './Option.dto';

function toOptionData(responseData: any[]): Option[] {
  return responseData.map(item => ({
    id: item.id,
    name: `${item.firstname} ${item.lastname}`,
  }));
}

export default toOptionData;
