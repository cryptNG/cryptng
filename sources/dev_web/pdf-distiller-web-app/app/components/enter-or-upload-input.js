import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EnterOrUploadInputComponent extends Component {
    
  get hasValueInserted(){
    return this.args.inputContent.length>0;
  }

  @tracked isLoading = false;
  element = null;


  @action didInsertFileUpload(element) {
    this.element = element;
    const button = element.querySelector(".drop_box_button");
    const  inputDropBox = element.querySelector(".drop_box_input");
    const  inputData = element.querySelector(".data_input");
    const  label = element.querySelector("label");


    let file;
    label.onclick = () => {
      inputData.focus();
    };
    button.onclick = () => {
      inputDropBox.click();
    };
    //if you do async code in a lambda without async keyword, the babel build won't tell you but die
    inputDropBox.addEventListener("change", async (e) => {
      this.isLoading=true;
      try{
        file = e.target.files[0];
        
        var reader = new FileReader();

        reader.onload = async (p) => {
          try
          {
            var arrayBuffer = reader.result;

            this.args.onUploadedContent({fileName : file.name,content : arrayBuffer});

          }catch(e)
          {
            console.log(e);
          }finally
          {
            this.isLoading=false;
          }
        }
        
        await reader.readAsArrayBuffer(file);

      
        inputDropBox.value = null; 
      }catch(e)
      {
        console.log(e);
        this.isLoading=false;
      }
    });

  }
}
