import ApiController from "@/core/ApiController"

export default class ExampleController extends ApiController implements APICRUDController{
    constructor(req: NextRequest, res: NextResponse) {
        super(req, res)
    }

    index(){
    }

    create(){}

    show(){}

    update(){}

    delete(){}
}