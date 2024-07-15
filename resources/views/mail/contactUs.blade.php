<x-mail::message>

<strong>Email: </strong> {{ $emailData['email']  }} <br>
@if(isset($emailData['phone']))
<strong>Phone: </strong> {{ $emailData['phone'] }}<br>
@endif
<strong>Name: </strong> {{ $emailData['name']  }} <br>
<div style="margin-top: 20px">
<strong>Message: </strong> <br> {{ $emailData['message']  }} <br>
</div>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
